import { HttpStatus } from '@nestjs/common';
import { RMQError } from 'nestjs-rmq';
import { ERROR_TYPE } from 'nestjs-rmq/dist/constants';

export class ProfileAlreadyExistException extends RMQError {
  constructor() {
    super('profile.already_exist', ERROR_TYPE.RMQ, HttpStatus.CONFLICT);
  }
}
