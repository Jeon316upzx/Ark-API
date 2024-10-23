import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Talk } from './schema/talk.schema';
import { CreateTalkDto } from './dto/talk.dto';
import { Attendee } from './schema/attendee.schema';
import { CreateAttendeeDto } from './dto/attendee.dto';

@Injectable()
export class TalkService {
  constructor(@InjectModel(Talk.name) private talkModel: Model<Talk>) {}

  async create(talkDto: CreateTalkDto): Promise<Talk> {
    const createdTalk = new this.talkModel(talkDto);
    return createdTalk.save();
  }

  async findAll(): Promise<Talk[]> {
    return this.talkModel.find().exec();
  }

  async findById(talkId: string): Promise<Talk | null> {
    const talk = await this.talkModel.findById(talkId);
    if (!talk) {
      throw new HttpException('No record found', HttpStatus.NOT_FOUND);
    }
    return talk;
  }

  async addAttendee(
    talkId: string,
    attendee: CreateAttendeeDto,
  ): Promise<Talk> {
    const talk = await this.talkModel.findById(talkId).exec();
    if (!talk) {
      throw new HttpException(
        `Talk with ID ${talkId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const attendeeExists = talk.attendees.some(
      (a) => a.email === attendee.email,
    );
    if (attendeeExists) {
      throw new HttpException(
        `Attendee with email ${attendee.email} is already added`,
        HttpStatus.CONFLICT,
      );
    }
    return this.talkModel
      .findByIdAndUpdate(
        talkId,
        { $push: { attendees: attendee } },
        { new: true },
      )
      .exec();
  }

  async removeAttendee(talkId: string, attendeeEmail: string): Promise<Talk> {
    const talk = await this.talkModel.findById(talkId);
    if (!talk) {
      throw new HttpException('No record found', HttpStatus.NOT_FOUND);
    }

    const attendeeExists = talk.attendees.some(
      (attendee) => attendee.email === attendeeEmail,
    );
    if (!attendeeExists) {
      throw new HttpException(
        `Attendee with email ${attendeeEmail} is not in this talk`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.talkModel
      .findByIdAndUpdate(
        talkId,
        { $pull: { attendees: { email: attendeeEmail } } },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<Talk> {
    const talk = await this.talkModel.findById(id);
    if (!talk) {
      throw new HttpException('Already deleted record', HttpStatus.NOT_FOUND);
    }
    return this.talkModel.findByIdAndDelete(id);
  }
}
