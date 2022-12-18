import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true})
  await app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000} 🚀`)
  })
}
bootstrap()