export declare class GetTimesheetRequestDto {
    employeeId: number;
    startPeriod: Date;
    endPeriod: Date;
    companyId: number;
    autoFix: boolean;
    isToConsiderNightHoursCorrected: boolean;
    nightExtraHoursInThePDF: boolean;
}
