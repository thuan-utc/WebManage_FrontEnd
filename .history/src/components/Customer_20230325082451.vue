<template>
  <h1>Manage customers</h1>
  <div class="container-fluid">
    <div class="row">
      <div class="search-form">
        <button @click="showFormSearch = !showFormSearch">{{ showFormSearch ? 'Hide search box' : 'Show search' }}</button>
        <div v-show="showFormSearch">
        <form>
          <label for="Id">ID</label>
            <input type="text" class="form-control" placeholder="Id" v-model="selectedRow.id">
        </form>
      </div>
    </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <table class="table-hover table-striped">
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
            <tr v-for="customer in tableData" :key="customer.id" @click="selectedRow = customer" >
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
        <h4 class="card-title">Detail Information</h4>
        <p class="card-description"> Basic form layout </p>
        <form class="forms-sample">
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
          <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
          <button class="btn btn-light">Cancel</button>
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
      menuItems: [
        { id: 'products', name: 'Manage Products' },
        { id: 'customers', name: 'Manage Customers' },
        { id: 'orders', name: 'Manage Orders' },
        { id: 'invoices', name: 'Manage Invoices' }
      ],
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
    displayedTableData() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    return this.tableData.slice(start, end);
  },
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
    async loadData(menuItemId) {
      try {
        this.tableData = await getAllCustomers();
      } catch (error) {
        alert('An error occurred: ' + error.message);
        this.tableData = [];
      }
    },
    showTable(menuItemId) {
      this.currentMenuItem = menuItemId
      this.currentPage = 1
      this.loadData(menuItemId)
      this.totalItems = this.tableData.length
    },
    gotoPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.loadData();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadData();
      }
    },
  },
  mounted() {
    // Load initial data for the first menu item
    this.showTable(this.menuItems[0].id)
  }
}
</script>

<style>
#detail-information {
  border-collapse: collapse;
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
}
table {
  border-collapse: collapse;
  border: 1px solid black;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid black;
  border: 1px solid black;
  padding: 8px;
}

tr:hover {
  background-color: #f5f5f5;
}

.row,
h1 {
  margin: 10px;
}

table.striped tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>