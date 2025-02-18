import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async createPost(
    title: string,
    content: string,
    authorId: number,
  ): Promise<Post> {
    return this.prisma.post.create({ data: { title, content, authorId } });
  }
  async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }
  async getPostById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }
  async updatePost(id: number, title: string, content: string): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  }
  async deletePost(id:number): Promise<Post> {
    return this.prisma.post.delete({
        where: {id}
    })
}
}
