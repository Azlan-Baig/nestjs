import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from '@prisma/client';
import { title } from 'process';
@Controller('posts')
export class PostsController {
  constructor(private readonly postservice: PostsService) {}
  @Post()
  async create(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('authorId') authorId: number,
  ): Promise<PostModel> {
    return this.postservice.createPost(title, content, authorId);
  }
  @Get()
  
  async getAllPosts(): Promise<PostModel[]> {
    return this.postservice.getAllPosts();
  }

  @Get(':id')
  async getOnePost(@Param('id') id: number): Promise<PostModel | null> {
    return this.postservice.getPostById(id);
  }
  
}