import { Injectable } from '@nestjs/common';
import { Mistral } from '@mistralai/mistralai';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {timeout} from "rxjs";
@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {
    this.examption('Привет')
  }
  public async examption (questionExamption: string) {

    const apiKey = this.config.get('MISTRAL_API_KEY');

      try {
        const response = await axios.post(
          'https://api.mistral.ai/v1/chat/completions',
          {
            model: 'mistral-large-latest',
            messages: [
              {
                role: 'user',
                content: questionExamption,
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            timeout: 10000
          },
        );

        console.log('Ответ:', response.data.choices["0"].message.content);
        return response.data.choices["0"].message.content
      } catch (error) {
        return (error.response ? error.response.data : error.message)
      }
  }}
