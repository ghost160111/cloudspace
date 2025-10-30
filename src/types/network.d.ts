export interface INetworkSubnet {
    id: number;
    cidr: string;
    ip_version: number;
    gateway_ip: string;
}

export interface INetworkFixedIP {
    subnet_id: string;
    ip_address: string;
}

export interface INetworkPort {
    id: number;
    fixed_ips: INetworkFixedIP[];
    status: string;
}

export interface INetwork {
    id: number;
    name: string;
    status: string;
    created_at: string;
    subnets: INetworkSubnet[];
    ports: INetworkPort[];
}

export interface INetworkSecurityRule {
    id: number;
    direction: string;
    ethertype: string;
    protocol: string | null;
    open_port_type: string;
    port_range_min: number | null;
    port_range_max: number | null;
    remote_ip_prefix: string | null;
}

export interface INetworkSecurityGroup {
    id: number;
    name: string;
    description: string;
    rules: INetworkSecurityRule[];
}
