export declare class CreateTimeclockRequestDto {
    timeclock: TimeclockRequest;
    token: string;
}
export declare class TimeclockRequest {
    companyId: number;
    lat: number;
    lng: number;
    password: string;
    cpf: string;
    deviceId: string | null;
    type: string;
    dtRegister: string;
    photoBase64: string | null;
    employeeObs: string | null;
    requestReceivedAt?: string;
}
