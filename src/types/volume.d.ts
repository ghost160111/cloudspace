export interface IVolumeSnapshot {
    id: number;
    snap_name: string;
    disk_used_gb: number;
    obj_created_at: string;
}

export interface IVolumeBackup {
    id: number;
    name: string;
    size: number;
    created_at: string;
}

export interface IVolume {
    id: number;
    name: string;
    status: "in-use" | "available";
    size: string;
    created_at: string;
    volume_type: "__DEFAULT__";
    bootable: boolean;
    attached_to: {
        id: number;
        name: string;
    } | null;
}
