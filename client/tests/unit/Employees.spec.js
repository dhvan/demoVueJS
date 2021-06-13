import { mount, createLocalVue } from "@vue/test-utils";
import Employees from "@/views/Employees";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock("@/services/EmployeesService", () => {
  return {
    index: jest.fn(),
    put: jest.fn(),
  };
});

const EmployeesService = require("@/services/EmployeesService");

describe("Employee unit tests: ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Employees, {
      localVue,
    });
  });

  it("Test Page Title", () => {
    expect(wrapper.text()).toContain("Employees List");
  });

  it("Test table no have data", () => {
    expect(wrapper.text()).toContain("There are no records to show");
  });

  describe("Have data", () => {
    beforeAll(() => {
      const data = [
        {
          id: 1,
          Name: "Dev 1",
          Teams: [],
        },
      ];

      EmployeesService.index.mockImplementation(() => {
        return new Promise((resolve) => {
          resolve({ data });
        });
      });

      EmployeesService.put.mockImplementation(() => {
        return new Promise((resolve) => {
          resolve();
        });
      });
    });

    it("Test table have 1 record", () => {
      expect(wrapper.text()).toContain("Dev 1");
    });

    it("Update name of employee", async () => {
      await wrapper.find("button.btn-info").trigger("click");
      const nameInputWrapper = wrapper.find("input#input-1");
      await nameInputWrapper.setValue("Dev 2");
      // Click submit button
      await wrapper.find("button.btn-primary").trigger("click");

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain("Dev 2");
    });
  });

  // Test filter function
  describe("Test filter", () => {
    beforeAll(() => {
      const data = [
        {
          Name: "Dev 1",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 2",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
      ];

      EmployeesService.index.mockImplementation(() => {
        return new Promise((resolve) => {
          resolve({ data });
        });
      });
    });

    it("No record matched", async () => {
      const filterInputWrapper = wrapper.find("input#filter-input");
      await filterInputWrapper.setValue("Dev 3");

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain(
        "There are no records matching your request"
      );
      expect(tableWrapper.html()).not.toContain("Dev 3");
    });

    it("Have records matched", async () => {
      const filterInputWrapper = wrapper.find("input#filter-input");
      await filterInputWrapper.setValue("Dev 1");

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain("Dev 1");
    });

    it("Test clear button", async () => {
      const filterInputWrapper = wrapper.find("input#filter-input");
      await filterInputWrapper.setValue("Dev 1");

      await wrapper.find("button.btn-secondary").trigger("click");

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain("Dev 1");
      expect(tableWrapper.html()).toContain("Dev 2");
    });
  });

  // Test paging function
  describe("Test paging", () => {
    beforeAll(() => {
      const data = [
        {
          Name: "Dev 1",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 2",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 3",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 4",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 5",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 6",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 7",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 8",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 9",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 10",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
        {
          Name: "Dev 11",
          Chucvu: "Developer",
          Dept: "1",
          Manager: "1",
          Teams: [],
        },
      ];

      EmployeesService.index.mockImplementation(() => {
        return new Promise((resolve) => {
          resolve({ data });
        });
      });
    });

    it("Per page is 10", async () => {
      const perPageSelectWrapper = wrapper.find("select#per-page-select");
      await perPageSelectWrapper.setValue(10);

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain("Dev 1");
      expect(tableWrapper.html()).toContain("Dev 10");
      expect(tableWrapper.html()).not.toContain("Dev 11");
    });

    it("Per page is 15", async () => {
      const perPageSelectWrapper = wrapper.find("select#per-page-select");
      await perPageSelectWrapper.setValue(15);

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain("Dev 1");
      expect(tableWrapper.html()).toContain("Dev 10");
      expect(tableWrapper.html()).toContain("Dev 11");
    });

    it("Per page is 20", async () => {
      const perPageSelectWrapper = wrapper.find("select#per-page-select");
      await perPageSelectWrapper.setValue(15);

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain("Dev 1");
      expect(tableWrapper.html()).toContain("Dev 10");
      expect(tableWrapper.html()).toContain("Dev 11");
    });

    it("Per page is 100", async () => {
      const perPageSelectWrapper = wrapper.find("select#per-page-select");
      await perPageSelectWrapper.setValue(15);

      const tableWrapper = wrapper.find("table");
      expect(tableWrapper.html()).toContain("Dev 1");
      expect(tableWrapper.html()).toContain("Dev 10");
      expect(tableWrapper.html()).toContain("Dev 11");
    });
  });
});
