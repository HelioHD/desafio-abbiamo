export declare class CreateTimesheetRequestDto {
    employeesId: number[];
    startPeriod: Date;
    endPeriod: Date;
    companyId: number;
    autoFix: boolean;
    isToConsiderNightHoursCorrected: boolean;
    nightExtraHoursInThePDF: boolean;
}
