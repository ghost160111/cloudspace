export interface IFlavor {
    name: string;
    vcpus: number;
    ram: number; // MB
    disk: number; // GB
}

export interface IFlavorWithID extends IFlavor {
    id: number;
}

export interface IImage {
    name: string;
    image_url: string;
}

export interface IImageWithID extends IImage {
    id: string;
}

export interface IImageDemo {
    name: string;
    image: string;
}

export interface IImageDemoWithId {
    id: number;
    name: string;
    image: string;
}

export type IPAddress = { addr: string; ipv: number };

export type Addresses = Record<string, IPAddress[]>;

export type DropletStatus =
    | "ACTIVE"
    | "STARTING"
    | "BUILD"
    | "ERROR"
    | "SUSPENDED"
    | "SHUTOFF"
    | "REBOOTING"
    | "SHUTTINGDOWN";

export interface IServer {
    id: number;
    name: string;
    status: DropletStatus;
    key_name: string;
    addresses: Addresses;
    flavor: IFlavor;
    image: IImage;
    created_at: string;
}

export interface IKeypair {
    name: string;
    type: "ssh";
    fingerprint: string;
    public_key: string;
}

export interface IDropletSnapshot {
    id: number;
    snap_name: string;
    disk_used_gb: number;
    obj_created_at: string;
}
