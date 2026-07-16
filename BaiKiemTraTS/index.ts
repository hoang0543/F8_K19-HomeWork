import {v7 as uuid} from "uuid";

interface Customer {
    id: string;
    name: string;
    tax: string;
    address: string;
}

class Employee {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = uuid();
        this.name = name;
    }

    receiveNoti(message: string): void {
        console.log(`${this.id} - ${this.name} received notification: ${message}`);
    }
}

interface Project {
    id: string;
    customerId: string;
    employeeId: string;
}

class CustomerService {
    private customers: Customer[] = [];

    create(customer: Omit<Customer, "id">) {
        const newCustomer: Customer = {
            id: uuid(),
            ...customer
        }
        this.customers.push(newCustomer);
        return newCustomer;
    }

    findById(id: string): Customer | null {
        return this.customers.find((c) => c.id === id) ?? null;
    }

    updateById(id: string, data: Partial<Customer>): Customer | null {
        const customer = this.customers.find((customer) => customer.id === id);

        if (!customer) return null;
        Object.assign(customer, data);
        return customer;
    }
}

class EmployeeService {
    private employees: Employee[] = [];

    create(employee: Omit<Employee, "id" | "receiveNoti">): Employee {
        const newEmployee = new Employee(employee.name);
        this.employees.push(newEmployee);
        return newEmployee;
    }

    findById(id: string): Employee | null {
        return this.employees.find((e) => e.id === id) ?? null;
    }

    updateById(id: string, data: Partial<Employee>): Employee | null {
        const employee = this.employees.find((e) => e.id === id);

        if (!employee) return null;
        Object.assign(employee, data);
        return employee;
    }
}

class ProjectService {
    private projects: Project[] = [];

    constructor(private employeeService: EmployeeService) {
    }

    create(project: Omit<Project, "id">): Project {
        const newProject: Project = {
            id: uuid(),
            ...project,
        }
        this.projects.push(newProject);

        const employee = this.employeeService.findById(newProject.employeeId);
        if (employee) {
            employee.receiveNoti("Bạn vừa được gán vào dự án mới.")
        }

        return newProject;
    }

    updateById(id: string, data: Partial<Project>): Project | null {
        const project = this.projects.find((p) => p.id === id);
        if (!project) return null;

        const oldEmployeeId = project.employeeId;
        Object.assign(project, data);

        if (data.employeeId && data.employeeId !== oldEmployeeId) {
            const newEmployee = this.employeeService.findById(data.employeeId);
            if (newEmployee) {
                newEmployee.receiveNoti("Bạn đã được chuyển giao phụ trách dụ án này.")
            }
        }
        return project;
    }
}

const customerService = new CustomerService();
const employeeService = new EmployeeService();
const projectService = new ProjectService(employeeService);

// case 1
const customer1 = customerService.create({
    name: "Cong ty F8",
    tax: "0123456789",
    address: "Ha Noi",
});

//case 2
const updateCustomer = customerService.updateById(
    customer1.id, {
        address: "Da Nang",
    }
)

//case 3
const employee1 = employeeService.create({ name: "Hoang"});
const employee2 = employeeService.create({ name: "Kien"});

console.log(employee1);
console.log(employee2);
console.log("id có khác nhau không:", employee1.id !== employee2.id);

//case 4
const foundEmployee = employeeService.findById(employee1.id);
console.log(foundEmployee);

const notFoundEmployee = employeeService.findById("123");
console.log(notFoundEmployee);

//case 5
const project1 = projectService.create({
  customerId: customer1.id,
  employeeId: employee1.id,
});
console.log(project1);
console.log("Project" + `${project1.id}` + "được tạo thành công.")

//case 6
const updatedProject = projectService.updateById(project1.id, {
  employeeId: employee2.id,
});
console.log(
  "Project đã đổi sang employee2:",
  updatedProject?.employeeId === employee2.id
);

//case 7
const customer2 = customerService.create({
  name: "Cong ty f10",
  tax: "83876483758",
  address: "HCM",
});
const projectAfterCustomerChange = projectService.updateById(project1.id, {
  customerId: customer2.id,
});
console.log(projectAfterCustomerChange);

//case 8
console.log(
  customerService.updateById("4354656", { name: "X" })
);
console.log(
  employeeService.updateById("6565656", { name: "X" })
);
console.log(
  projectService.updateById("543489", { customerId: "x" })
);

//case 9
const project2 = projectService.create({
  customerId: customer1.id,
  employeeId: "67648789",
});
console.log(project2);