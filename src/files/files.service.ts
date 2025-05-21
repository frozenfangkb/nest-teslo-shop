import { join } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '..', '..', 'static', 'uploads', imageName);

    if (!fileExistsSync(path)) {
      throw new NotFoundException('Image not found');
    }

    return path;
  }
}
