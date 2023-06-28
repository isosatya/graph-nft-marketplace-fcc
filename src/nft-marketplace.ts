import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
} from '../generated/NftMarketplace/NftMarketplace';
import {
  ItemBought,
  ItemCancelled,
  ItemListed,
  ActiveItem,
} from '../generated/schema';

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  let activItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  if (!activItem) {
    activItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemListed.seller = event.params.seller;
  activItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activItem.price = event.params.price;

  activItem.save();
  itemListed.save();

  // let entity = new ItemListed(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  // entity.seller = event.params.seller;
  // entity.nftAddress = event.params.nftAddress;
  // entity.tokenId = event.params.tokenId;
  // entity.price = event.params.price;
  // entity.blockNumber = event.block.number;
  // entity.blockTimestamp = event.block.timestamp;
  // entity.transactionHash = event.transaction.hash;
  // entity.save();
}

export function handleItemBought(event: ItemBoughtEvent): void {
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  let activItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddress;
  itemBought.tokenId = event.params.tokenId;

  activItem!.buyer = event.params.buyer;

  itemBought.save();
  activItem!.save();

  // let entity = new ItemBought(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.buyer = event.params.buyer
  // entity.nftAddress = event.params.nftAddress
  // entity.tokenId = event.params.tokenId
  // entity.price = event.params.price
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let itemCancelled = ItemCancelled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  let activItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemCancelled) {
    itemCancelled = new ItemCancelled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemCancelled.seller = event.params.seller;
  itemCancelled.nftAddress = event.params.nftAddress;
  itemCancelled.tokenId = event.params.tokenId;

  // 0x000000000000000000000000000000000000dEaD
  activItem!.buyer = Address.fromString(
    '0x000000000000000000000000000000000000dEaD'
  );

  itemCancelled.save();
  activItem!.save();

  // let entity = new ItemCancelled(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity.seller = event.params.seller
  // entity.nftAddress = event.params.nftAddress
  // entity.tokenId = event.params.tokenId
  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash
  // entity.save()
}
