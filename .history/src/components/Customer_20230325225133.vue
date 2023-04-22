<template>
  <h1 class="display1">Manage customers</h1>
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
                  <input type="text" class="form-control search" placeholder="id" v-model="searchId">
                </div>
                <div class="col-lg-3">
                  <label>Name</label>
                  <input type="text" class="form-control search" placeholder="name" v-model="searchName">
                </div>
                <div class="col-lg-3">
                  <label>Phone</label>
                  <input type="text" class="form-control search" placeholder="phone" v-model="searchPhone">
                </div>
                <div class="col-lg-3">
                  <label>Email</label>
                  <input type="text" class="form-control search" placeholder="email" v-model="searchEmail">
                </div>
              </div>

              <div class="row">
                <div class="col-lg-3">
                  <label>Address</label>
                  <input type="text" class="form-control search" placeholder="address" v-model="searchAddress">
                </div>
                <div class="col-lg-3">
                  <label>Created Date</label>
                  <input type="date" class="form-control search" placeholder="date" v-model="searchCreatedDate">
                </div>
                <div class="col-lg-1" style="margin-top: 12px;">
                  <button type="" class="btn btn-info" @click.prevent="searchBy">Search</button>
                </div>
                <div class="col-lg-1">
                  <button type="reset" style="margin-top: 12px;" class="btn btn-success">Reset</button>
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
            <tr v-for="customer in tableData" :key="customer.id" @click="selectedRow = customer">
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
        <form class="form-control">
          <h4 class="card-title">Detail Information</h4>
          <div class="form-group">
            <label for="Id">ID</label>
            <input type="text" class="form-control" placeholder="Id" v-model="selectedRow.id">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="selectedRow.customerName">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Phone Number</label>
            <input type="text" class="form-control" placeholder="PhoneNumber" v-model="selectedRow.phoneNumber">
          </div>
          <div class="form-group">
            <label for="exampleInputConfirmPassword1">Email</label>
            <input type="email" class="form-control" placeholder="Email" v-model="selectedRow.email">
          </div>
          <div class="form-group">
            <label for="exampleInputConfirmPassword1">Address</label>
            <input type="text" class="form-control" placeholder="Address" v-model="selectedRow.address">
          </div>
          <button type="submit" class="btn btn-info me-2">Edit</button>
          <button class="btn btn-secondary">Cancel</button>
        </form>
      </div>

    </div>

  </div>
</template>

<script>
import { getAllCustomers } from "../utils/customer.js";

export default {
  components: {
    // Pagination
  },
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
      tableData: [],
      selectedRow: {
        id: '',
        customerName: '',
        phoneNumber: '',
        email: '',
        address: ''
      },
      showFormSearch: false
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
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
    async loadData() {
      try {
        this.tableData = await getAllCustomers();
      } catch (error) {
        alert('An error occurred: ' + error.message);
        this.tableData = [];
      }
    },
    searchBy() {
       searchCriteria = {
        id: this.searchId,
        name: this.searchName,
        phone: this.searchPhone,
        email: this.searchEmail,
        address: this.searchAddress,
        createdDate: this.searchCreatedDate
      };
      let allEmpty = true;
      for (let key in searchCriteria) {
        if (searchCriteria[key]) {
          allEmpty = false;
          break;
        }
      }
      if (allEmpty) {
        searchCriteria = null;
      }
      getAllCustomers(this.currentPage, this.perPage, searchCriteria)
        .then((response) => {
          this.tableData = response.content;
          this.totalItems = response.total;
          this.currentPage = response.currentPage;
          this.totalPages = response.totalPages
        })
        .catch((error) => {
          alert('An error occurred: ' + error.message);
          this.tableData = [];
          this.totalItems = 0;
          this.currentPage = 1;
        });
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
    this.loadData();
    // this.searchBy();
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
</style>