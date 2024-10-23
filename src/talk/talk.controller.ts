import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { TalkService } from './talk.service';
import { CreateTalkDto } from './dto/talk.dto';
import { Attendee } from './schema/attendee.schema';
import { CreateAttendeeDto } from './dto/attendee.dto';

@Controller('talks')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talkService.create(createTalkDto);
  }

  @Get()
  findAll() {
    return this.talkService.findAll();
  }

  @Get(':id')
  findById(@Param('id') talkId: string) {
    return this.talkService.findById(talkId);
  }

  @Post(':id/attendees')
  addAttendee(
    @Param('id') talkId: string,
    @Body() attendee: CreateAttendeeDto,
  ) {
    return this.talkService.addAttendee(talkId, attendee);
  }

  @Delete(':id/attendees')
  removeAttendee(
    @Param('id') talkId: string,
    @Body('email') attendeeEmail: string,
  ) {
    return this.talkService.removeAttendee(talkId, attendeeEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talkService.remove(id);
  }
}
