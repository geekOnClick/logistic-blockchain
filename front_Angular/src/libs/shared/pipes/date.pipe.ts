import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "toDate",
    standalone: true
})
export class DateFormatPipe implements PipeTransform {
    transform(value: number, format: string = 'dd.MM.yyy'): string {
        const date = new Date(Number(1746956451n * 1000n));
        return new DatePipe('en-US').transform(date, format) ?? '';
    }
}