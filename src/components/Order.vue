<template>
  <h1 class="display1">Manage orders</h1>
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
                  <label>Phone</label>
                  <input type="text" class="form-control search" placeholder="phone" v-model="searchPhone" @input="this.isfirstSearchWithCriteria = true">
                </div>
                <div class="col-lg-3">
                  <label>Email</label>
                  <input type="text" class="form-control search" placeholder="email" v-model="searchEmail" @input="this.isfirstSearchWithCriteria = true">
                </div>
              </div>

              <div class="row">
                <div class="col-lg-3">
                  <label>Address</label>
                  <input type="text" class="form-control search" placeholder="address" v-model="searchAddress" @input="this.isfirstSearchWithCriteria = true">
                </div>
                <div class="col-lg-3">
                  <label>Created Date</label>
                  <input type="date" class="form-control search" placeholder="date" v-model="searchCreatedDate" @input="this.isfirstSearchWithCriteria = true">
                </div>
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
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in tableData" :key="customer.id" @click="this.selectedRow = customer">
              <td>{{ customer.id }}</td>
              <td>{{ customer.customerName }}</td>
              <td>{{ customer.phoneNumber }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ customer.createdDate }}</td>
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
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="this.selectedRow.customerName"
              :disabled="!isEditing">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Phone Number</label>
            <input type="text" class="form-control" placeholder="PhoneNumber" v-model="this.selectedRow.phoneNumber"
              :disabled="!isEditing">
          </div>
          <div class="form-group">
            <label for="exampleInputConfirmPassword1">Email</label>
            <input type="email" class="form-control" placeholder="Email" v-model="this.selectedRow.email"
              :disabled="!isEditing">
          </div>
          <div class="form-group">
            <label for="exampleInputConfirmPassword1">Address</label>
            <input type="text" class="form-control" placeholder="Address" v-model="this.selectedRow.address"
              :disabled="!isEditing">
          </div>
          <!-- <button v-show="!isEditing" class="btn btn-primary" @click.prevent="addCustomer">Add</button> -->
          <button v-show="!isEditing && selectedRow.id !== ''" type="submit" class="btn btn-info"
            @click.prevent="isEditing = true">Edit</button>
          <button v-show="isEditing" type="submit" class="btn btn-info" @click.prevent="updateCustomer">Update</button>
          <button v-show="isEditing" class="btn btn-secondary" @click.prevent="cancelEdit">Cancel</button>
          <button v-show="!isEditing && selectedRow.id !== ''" class="btn btn-danger"
            @click.prevent="removeCustomer">Delete</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script>
import { getAllCustomers, editCustomer, getAllCustomersWithSearchCriteria, deleteCustomer } from "../utils/customer.js";
import moment from 'moment';
export default {
  data() {
    return {
      searchId: '',
      searchName: '',
      searchPhone: '',
      searchEmail: '',
      searchAddress: '',
      searchCreatedDate: '',
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      totalPages: 0,
      tableData: [],
      selectedRow: {
        id: '',
        customerName: '',
        phoneNumber: '',
        email: '',
        address: ''
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
      this.searchPhone = '';
      this.searchEmail = '';
      this.searchAddress = '';
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
        phone: this.searchPhone,
        email: this.searchEmail,
        address: this.searchAddress,
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
        getAllCustomers(this.currentPage - 1, this.perPage)
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
        getAllCustomersWithSearchCriteria(this.currentPage - 1, this.perPage, searchCriteria)
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
    async updateCustomer() {
      let customer = {
        id: this.selectedRow.id,
        customerName: this.selectedRow.customerName,
        phoneNumber: this.selectedRow.phoneNumber,
        email: this.selectedRow.email,
        address: this.selectedRow.address
      };
      await editCustomer(customer);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.searchBy();
      this.selectedRow = {
        id: '',
        customerName: '',
        phoneNumber: '',
        email: '',
        address: ''
      }
      this.isEditing = false;
    },
    cancelEdit() {
      this.searchBy();
      this.isEditing = false;
    },
    addCustomer() {

    },
    async removeCustomer() {
      let id = this.selectedRow.id;
      await deleteCustomer(id);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.searchBy();
      this.selectedRow = {
        id: '',
        customerName: '',
        phoneNumber: '',
        email: '',
        address: ''
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