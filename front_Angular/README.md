## Поднимаем блокчейн Hardhat

npx hardhat node


## Пушим контракт в блокчейн

npx hardhat run scripts/deploy.ts --network localhost

## Поднимаем фронт
nvm use node (опционально при использовании nvm поднимаем до последней версии node)
cd front/
npm run build (опционально, если не стартует дев сервер, предварительно удалить директорию .next)
npm run dev (не start, или не будет hot reload)

