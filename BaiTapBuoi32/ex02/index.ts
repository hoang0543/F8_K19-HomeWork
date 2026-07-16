class Customer {
    private id: string;
    private name: string;
    private phone: number;
    private address: string;

    constructor(id: string, name: string, phone: number, address: string) {
        this.id = id;
        this.name  = name;
        this.phone = phone;
        this.address = address;
    }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    get Phone(): number {
        return this.phone;
    }

    get Address(): string {
        return this.address;
    }
}

updatePhone(phone: number): void {
    this.phone = phone;
}

updateAddress(address: string): void {
    this.address = address;
}

toString(): toString {
    return `Customer[id=${this.id}, name=${this.name}, phone=${this.phone}, address=${this.address}]`;
}

