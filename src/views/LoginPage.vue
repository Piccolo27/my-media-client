<template>
  <div class="d-flex justify-content-end my-5 me-5">
    <p class="mx-5 text-danger" @click="home()">Home</p>
    |
    <p class="mx-5 text-dark" @click="login()">Login</p>
  </div>
  <div class="container col-5 shadow-sm my-5 p-5">
    <div class="mb-5">
      <legend>Login Form</legend>
      <div class="alert alert-danger" role="alert" v-if="userStatus">
        Incorrect Email or Password
      </div>
      <div class="mb-3">
        <label class="form-label float-start">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="userData.email"
        />
      </div>
      <div class="mb-3">
        <label class="form-label float-start">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Enter pasword"
          v-model="userData.password"
        />
      </div>
      <button
        type="submit"
        class="btn-dark float-start mt-3"
        style="border-radius: 5px"
        @click="accountLogin()"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script src="../js/login.js"></script>

