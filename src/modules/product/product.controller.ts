import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('protect')
  @UseGuards(AuthGuard())
  findAllProtected() {
    return this.productService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  create(@CurrentUser() user: User) {
    return this.productService.create(user);
  }
}
