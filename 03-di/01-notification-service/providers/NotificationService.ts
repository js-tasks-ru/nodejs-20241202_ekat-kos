import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {

	sendEmail(email: string, subject: string, message: string): void {

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
    throw new BadRequestException('Invalid email format');
   }

	 if (!email || email.trim() === '') {
     throw new BadRequestException();
    }

    if (!subject || subject.trim() === '') {
      throw new BadRequestException();
    }

    if (!message || message.trim() === '') {
      throw new BadRequestException();
    }
	}

	sendSMS(phone: string, message: string): void {

		const phoneRegex = /^\+?[1-9]\d{7,14}$/;

  if (!phoneRegex.test(phone)) {
    throw new BadRequestException('Invalid phone number format');
  }
		
	if (!message || message.trim() === '') {
      throw new BadRequestException();
    }
	}
}