<script setup>
import { ref, onMounted } from 'vue';
import { getBooks, getLogs, returnBook } from './api/client.js';

const metrics = ref(null);
const books = ref([]);
const logs = ref([]);
const showForm = ref(false);
const formBookId = ref('');
const errorMessage = ref('');

function isOverdue(book) {
  const today = new Date().toISOString().slice(0, 10);
  return !book.returned && book.dueDate < today;
}

async function loadBooks() {
  try {
    const [data, logdata] = await Promise.all([
      getBooks(),
      getLogs()
    ]);

    logs.value = logdata;
    metrics.value = data.metrics;
    books.value = data.books;
  } catch (err) {
    errorMessage.value = err.message;
  }
}

async function handleReturn(id) {
  try {
    await returnBook(id);
    await loadBooks();
  } catch (err) {
    errorMessage.value = err.message;
  }
}

async function handleFormSubmit() {
  const id = Number(formBookId.value);
  if (!id) {
    errorMessage.value = 'Enter a valid book id';
    return;
  }
  await handleReturn(id);
  formBookId.value = '';
  showForm.value = false;
}

onMounted(loadBooks);
</script>

<template>
  <div class="container my-4">

    <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
      <h2 class="m-1 bg-light p-3">Library Due Date Monitor</h2>
      <button class="btn btn-outline-primary" @click="showForm = !showForm">
        Log Entry
      </button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div v-if="showForm" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Return a Book</h5>
        <div class="input-group">
          <input v-model="formBookId" type="number" class="form-control" placeholder="Book ID" />
          <button class="btn btn-success" @click="handleFormSubmit">
            Return Book
          </button>
        </div>
      </div>
    </div>

    <!-- Metrics -->
    <div v-if="metrics" class="row text-center mb-4">
      <div class="col border p-3">
        <div class="fs-4">{{ metrics.total }}</div>
        <div class="text-muted">Total</div>
      </div>
      <div class="col border p-3">
        <div class="fs-4">{{ metrics.returned }}</div>
        <div class="text-muted">Returned</div>
      </div>
      <div class="col border p-3">
        <div class="fs-4">{{ metrics.outstanding }}</div>
        <div class="text-muted">Outstanding</div>
      </div>
      <div class="col border p-3">
        <div class="fs-4 text-danger">{{ metrics.overdue }}</div>
        <div class="text-muted">Overdue</div>
      </div>
      <div class="col border p-3">
        <div class="fs-4">{{ metrics.returnRate }}%</div>
        <div class="text-muted">Return Rate</div>
      </div>
      <div class="col border p-3">
        <div class="fs-4 text-danger">{{ metrics.overdueRate }}%</div>
        <div class="text-muted">Overdue Rate</div>
      </div>
    </div>

    <div class="row">

      <!-- Books table 8/12 -->
      <div class="col-lg-8 mb-4">
        <table class="table table-bordered">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Borrower</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id" :class="{ 'table-danger': isOverdue(book) }">
              <td>{{ book.id }}</td>
              <td>{{ book.bookName }}</td>
              <td>{{ book.borrowerName }}</td>
              <td>{{ book.dueDate }}</td>
              <td>
                <span v-if="book.returned" class="badge bg-secondary">Returned</span>
                <span v-else-if="isOverdue(book)" class="badge bg-danger">Overdue</span>
                <span v-else class="badge bg-success">On Loan</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- History Feed 4/12 -->
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header bg-light">
            <h6 class="mb-0">History Feed</h6>
          </div>
          <ul class="list-group list-group-flush">

            <li v-if="!logs.length" class="list-group-item text-muted text-center py-4">
              No recent activity
            </li>

            <li v-for="log in logs" :key="log.id" class="list-group-item">
              <div class="fw-bold">{{ log.bookName }}</div>
              <div class="text-muted small">
                Returned by {{ log.borrowerName }} ~ID: {{  log.id  }}
              </div>

              <div class="text-muted small text-end" v-if="log.returnedAt">
                {{ new Date(log.returnedAt).toLocaleDateString() }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>