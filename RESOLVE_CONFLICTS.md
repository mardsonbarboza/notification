# Guia de Resolução de Conflitos

## Se você tiver conflitos ao fazer pull:

### Opção 1: Aceitar todas as mudanças remotas (recomendado)
```bash
git fetch origin claude/fix-prisma-datasources-012Ax7Gt83ez1GN5Z1C3zD5s
git reset --hard origin/claude/fix-prisma-datasources-012Ax7Gt83ez1GN5Z1C3zD5s
```

### Opção 2: Resolver manualmente
```bash
git pull origin claude/fix-prisma-datasources-012Ax7Gt83ez1GN5Z1C3zD5s
# Se houver conflitos, edite os arquivos marcados
git add .
git commit -m "merge: resolve conflicts"
```

## Arquivos modificados no último commit:

1. **src/app.module.ts** - Removido EventsGateway duplicado
2. **src/events/events/events.module.ts** - Adicionado forwardRef
3. **src/notification/notification.module.ts** - Adicionado forwardRef

## Estado esperado dos arquivos:

### src/app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events/events.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [EventsModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],  // ← EventsGateway REMOVIDO
})
export class AppModule {}
```

### src/events/events/events.module.ts
```typescript
import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [forwardRef(() => NotificationModule)],  // ← forwardRef ADICIONADO
  providers: [EventsGateway, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
```

### src/notification/notification.module.ts
```typescript
import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsModule } from '../events/events/events.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [PrismaModule, forwardRef(() => EventsModule)],  // ← forwardRef ADICIONADO
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
```

## Após resolver os conflitos:

```bash
# Gerar Prisma Client
npx prisma generate

# Criar banco de dados
npx prisma migrate dev --name init

# Testar a aplicação
npm run start:dev
```

## Verificação:

A aplicação deve iniciar sem os erros:
- ✅ Sem "UndefinedModuleException"
- ✅ Sem "circular dependency"
- ✅ Sem "Nest can't resolve dependencies"
