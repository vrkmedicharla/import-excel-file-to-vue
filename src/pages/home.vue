<template>
  <div>
    <div class="q-ma-xl text-center">
      <q-input
        type="file"
        id="file"
        v-model="files"
        outlined
        @change="openFile($event)"
      />
    </div>
    <div >
      <div class="q-pa-md" v-if="fileData.length > 0">
        <q-markup-table>
      <thead>
         <draggable v-model="headingTitle" tag="tr">
                <th class="text-left" v-for="(title,i) in headingTitle" :key="i">{{title}}</th>
          </draggable>

      </thead>
      <!-- <tbody> -->
        <draggable v-model="fileData" tag="tbody">
         <tr v-for="(data,index) in fileData" :key="index">
          <td scope="row" class="text-left" v-for="header in headingTitle" :key="header">{{data[header]}}</td>

        </tr>

        </draggable>


      <!-- </tbody> -->
    </q-markup-table>
      </div>
       <div class="text-center" v-else>
         <h6>No Data Found</h6>
    </div>
    </div>

  </div>
</template>
<script>
import draggable from "vuedraggable";
import tableDragger from "table-dragger";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      dragging: false,
      files: "",
      fileData: [],
      headingTitle : [],
      headersData: [],
      selectedFile: "",
      pagination: {
        rowsPerPage: 0,
      },
    };
  },
  mounted() {

  },
  methods: {
    openFile(event) {
      console.log(event.target.files, "222222222");
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(this.selectedFile);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workload = XLSX.read(data, { type: "binary" });
        console.log(workload, "pppppppppppp");
        workload.SheetNames.forEach((element) => {
          let rowObj = XLSX.utils.sheet_to_row_object_array(
            workload.Sheets[element]
          );

          this.fileData = rowObj;
          console.log(this.fileData, "--------");
          this.headingTitle = Object.keys(this.fileData[0]);
          this.headersData = this.headingTitle.map((item) => {
            return {
              label: item,
              field: item,
            };
          });
          console.log(this.headersData, "columns");
          console.log(this.fileData, "data");
        });
      };
    },

  },
};
</script>
