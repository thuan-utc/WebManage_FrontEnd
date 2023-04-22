<template>
  <h1 class="display1">Manage products</h1>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
    <div v-if="isLoading" class="spinner-border" role="status">
      <span v-if="isLoading" class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div>
        <button id="toggle" class="btn btn-outline-secondary" @click="showFormSearch = !showFormSearch">
          <i class="mdi mdi-format-vertical-align-center"></i>
          {{ showFormSearch ? 'Hide' : 'Search' }}</button>
        <div v-show="showFormSearch" class="search-form">
          <form class="form-control">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-3">
                  <label>ID</label>
                  <input type="text" class="form-control search" placeholder="id" v-model="searchId" @input="this.isfirstSearchWithCriteria = true">
                </div>
                <div class="col-lg-3">
                  <label>Name</label>
                  <input type="text" class="form-control search" placeholder="name" v-model="searchName" @input="this.isfirstSearchWithCriteria = true">
                </div>
                <div class="col-lg-3">
                  <label>Description</label>
                  <input type="text" class="form-control search" placeholder="descroption" v-model="searchdescription" @input="this.isfirstSearchWithCriteria = true">
                </div>
                <div class="col-lg-3">
                  <label>Price</label>
                  <input type="text" class="form-control search" placeholder="price" v-model="searchprice" @input="this.isfirstSearchWithCriteria = true">
                </div>
              </div>

              <div class="row">
                <div class="col-lg-1" style="margin-top: 12px;">
                  <button type="" class="btn btn-info" @click.prevent="searchBy">Search</button>
                </div>
                <div class="col-lg-1">
                  <button type="reset" style="margin-top: 12px;" class="btn btn-success" @click="reset">Reset</button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in tableData" :key="product.id" @click="this.selectedRow = product">
              <td>{{ product.id }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.productDescription }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.quantity }}</td>
            </tr>
          </tbody>
        </table>

        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage <= 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="previousPage">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div id="detail-information" class="col-lg-4">
        <form class="form-control" :disabled="!isEditing">
          <h4 class="card-title">Detail Information</h4>
          <div class="form-group">
            <label for="Id">ID</label>
            <input type="text" class="form-control" placeholder="Id" v-model="this.selectedRow.id" :disabled="true">
          </div>
          <div class="form-group">
            <label for="exampleInputprice1">Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="this.selectedRow.productName"
              :disabled="!isEditing">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <input type="text" class="form-control" placeholder="Description" v-model="this.selectedRow.descriptionNumber"
              :disabled="!isEditing">
          </div>
          <div class="form-group">
            <label for="exampleInputConfirmPassword1">Price</label>
            <input type="price" class="form-control" placeholder="Price" v-model="this.selectedRow.price"
              :disabled="!isEditing">
          </div>
          <div class="form-group">
            <label for="exampleInputConfirmPassword1">Quantity</label>
            <input type="text" class="form-control" placeholder="Quantity" v-model="this.selectedRow.quantity"
              :disabled="!isEditing">
          </div>
          <!-- <button v-show="!isEditing" class="btn btn-primary" @click.prevent="addproduct">Add</button> -->
          <button v-show="!isEditing && selectedRow.id !== ''" type="submit" class="btn btn-info"
            @click.prevent="isEditing = true">Edit</button>
          <button v-show="isEditing" type="submit" class="btn btn-info" @click.prevent="updateproduct">Update</button>
          <button v-show="isEditing" class="btn btn-secondary" @click.prevent="cancelEdit">Cancel</button>
          <button v-show="!isEditing && selectedRow.id !== ''" class="btn btn-danger"
            @click.prevent="removeproduct">Delete</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script>
import { getAllproducts } from "../utils/product.js";
import moment from 'moment';
export default {
  data() {
    return {
      searchId: '',
      searchName: '',
      searchdescription: '',
      searchprice: '',
      searchquantity: '',
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      totalPages: 0,
      tableData: [],
      selectedRow: {
        id: '',
        productName: '',
        descriptionNumber: '',
        price: '',
        quantity: ''
      },
      showFormSearch: false,
      isEditing: false,
      isLoading: false,
      isfirstSearchWithCriteria: true
    }
  },
  computed: {
    pages() {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, start + 4);
      const pagesArray = [];
      for (let i = start; i <= end; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    }
  },
  methods: {
    reset() {
      this.searchId = '';
      this.searchName = '';
      this.searchdescription = '';
      this.searchprice = '';
      this.searchquantity = '';
      this.searchCreatedDate = '';
      this.searchBy();
      this.isfirstSearchWithCriteria = true;
      this.currentPage = 0;
    },
    searchBy() {
      this.isLoading = true
      let searchCriteria = {
        id: this.searchId,
        name: this.searchName,
        description: this.searchdescription,
        price: this.searchprice,
        quantity: this.searchquantity,
        createdDate: this.searchCreatedDate
      };
      let allEmpty = true;
      for (let key in searchCriteria) {
        if (searchCriteria[key] !== '') {
          allEmpty = false;
          break;
        }
      }
      if (allEmpty) {
        searchCriteria = null;
        getAllproducts(this.currentPage - 1, this.perPage)
          .then((response) => {
            this.tableData = response.content;
            this.totalItems = response.totalElements;
            this.totalPages = response.totalPages;
            // if (response.currentPage !== null) {
            //   this.currentPage = response.currentPage + 1;
            // }
          })
          .catch((error) => {
            alert('An error occurred: ' + error.message);
            this.tableData = [];
            this.totalItems = 0;
            this.totalPages = 0;
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        if (this.isfirstSearchWithCriteria)
        {
          this.currentPage = 1;
        }
        getAllproductsWithSearchCriteria(this.currentPage - 1, this.perPage, searchCriteria)
          .then((response) => {
            this.tableData = response.content;
            this.totalItems = response.totalElements;
            this.totalPages = response.totalPages;
            // if (response.currentPage !== null) {
            //   this.currentPage = response.currentPage + 1;
            // }
            this.isfirstSearchWithCriteria = false
          })
          .catch((error) => {
            alert('An error occurred: ' + error.message);
            this.tableData = [];
            this.totalItems = 0;
            this.totalPages = 0;
          })
          .finally(() => {
            this.isLoading = false
          })
      }
      this.isLoading = false;
    },
    async updateproduct() {
      let product = {
        id: this.selectedRow.id,
        productName: this.selectedRow.productName,
        descriptionNumber: this.selectedRow.descriptionNumber,
        price: this.selectedRow.price,
        quantity: this.selectedRow.quantity
      };
      await editproduct(product);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.searchBy();
      this.selectedRow = {
        id: '',
        productName: '',
        descriptionNumber: '',
        price: '',
        quantity: ''
      }
      this.isEditing = false;
    },
    cancelEdit() {
      this.searchBy();
      this.isEditing = false;
    },
    addproduct() {

    },
    async removeproduct() {
      let id = this.selectedRow.id;
      await deleteproduct(id);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.searchBy();
      this.selectedRow = {
        id: '',
        productName: '',
        descriptionNumber: '',
        price: '',
        quantity: ''
      }
    },
    gotoPage(page) {
      this.currentPage = page;
      this.searchBy();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.searchBy();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.searchBy();
      }
    },
  },
  mounted() {
    this.searchBy();
  }
}
</script>

<style>
#toggle form {
  display: flex;
}

#toggle {
  margin-bottom: 2px;
}

.row,
h1 {
  margin: 10px;
}

.btn {
  margin-left: 5px;
}
</style> 

