// src/common/pipes/zod.validation.pipe.ts
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodTypeAny) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const tree = z.treeifyError(result.error);

      throw new BadRequestException({
        message: 'Validation failed',
        error: tree,
      });
    }

    return result.data;
  }
}
