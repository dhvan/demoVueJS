import { mount, createLocalVue } from "@vue/test-utils";
import Employees from "@/views/Employees";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock("@/services/EmployeesService", () => {
  return {
    index: jest.fn(),
  };
});

const EmployeesService = require("@/services/EmployeesService");

describe("Employee unit tests: ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Employees, {
      localVue,
    });

    // jest.resetAllMocks();
  });

  it("Test Page Title", () => {
    expect(wrapper.text()).toContain("Employees List");
  });

  it("Test table no have data", () => {
    expect(wrapper.text()).toContain("There are no records to show");
  });

  describe("Have data", () => {
    beforeAll(() => {
      EmployeesService.index.mockImplementation(() => {
        return new Promise((resolve) => {
          resolve({
            data: [
              {
                Name: "Tran Cao Khanh Ngoc",
                Teams: [],
              },
            ],
          });
        });
      });
    });

    it("Test table have 1 record", () => {
      
      expect(wrapper.text()).toContain("Tran Cao Khanh Ngoc");
    });

    it("Open edit modal", async () => {
      await wrapper.find("button.btn-info").trigger("click");

      expect(wrapper.text()).toContain("Full Name");
      expect(wrapper.text()).toContain("Dept");
      expect(wrapper.text()).toContain("Simple select / dropdown");
    });
  });
});
