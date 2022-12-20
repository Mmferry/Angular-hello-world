import { BadInput } from './../../common/bad-input';
import { NotFoundError } from './../../common/not-found-error';
import { AppError } from './../../common/app-error';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

export interface Post {
  userId?: number;
  id: number;
  title: string;
  body?: string;
}

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts!: Post[];

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.service.getAll<Post[]>().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    this.posts.splice(0, 0, post);

    input.value = '';

    this.service.create(post).subscribe(
      (newPost) => {
        post = { ...newPost, ...post };
      },
      (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInput) console.log(error.originalError);
        else throw error;
      }
    );
  }

  updatePost(post: Post) {
    this.service.update(post).subscribe((updatedPost) => {
      console.log(updatedPost);
    });
  }

  deletePost(post: Post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id).subscribe(null, (error: AppError) => {
      this.posts.splice(index, 0, post);

      if (error instanceof NotFoundError)
        alert('This post has already been deleted.');
      else throw error;
    });
  }
}
