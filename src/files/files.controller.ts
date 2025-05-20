import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/file-filter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
    }),
  )
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(
        "File wasn't present or it wasn't a valid image",
      );
    }

    return {
      fileName: file.originalname,
    };
  }
}
