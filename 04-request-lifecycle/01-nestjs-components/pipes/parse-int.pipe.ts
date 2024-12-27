import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform {
	transform(value: string): number {

		const intValue = parseInt(value, 10)

		if (isNaN(intValue)) {
			throw new BadRequestException(`"${value}" не является числом`)
		}
		
		return intValue

  }
}
