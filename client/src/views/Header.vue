<template>
<div>
  <b-navbar type="dark " variant="info">
    <b-navbar-nav>
      <b-nav-item href="http://localhost:8080/">Home</b-nav-item>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="Employee" right>
        <b-dropdown-item href="http://localhost:8080/employees">View</b-dropdown-item>
        <b-dropdown-item href="http://localhost:8080/employees/create">Create</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>
