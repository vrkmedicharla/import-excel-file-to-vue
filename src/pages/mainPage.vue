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
    <div>
      <div class="q-pa-md">
        <q-table
          id="table"
          title="Sample Data"
          :data="fileData"
          :columns="headersData"
          row-key="name"
          :pagination.sync="pagination"
        >


          <template v-slot:slot:header="props" >
             <draggable v-model="headingTitle" tag="q-td">
            <q-tr :props="props" id="table"   >

              <q-th

                class="handle"
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>

            </q-tr>
              </draggable>
          </template>
        </q-table>
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
     this.tableDraging();
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
   tableDraging(){
     var el = document.getElementsByTagName("table")[0];
     var dragger = tableDragger(el, {
  mode: 'row',
  dragHandler: '.handle',
  onlyBody: true,
  animation: 300
});
dragger.on('drop',function(from, to){
  console(from);
  console(to);
});
    }
  },
};
</script>
