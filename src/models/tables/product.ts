import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { TimeColumns } from '../common/time-columns';
import { Seller } from './seller';

@Index('FK__Product__Seller', ['sellerId'], {})
@Entity()
export class Product extends TimeColumns {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column('int', { nullable: false, select: true, comment: '판매자 ID' })
  public sellerId: number;

  @Column('varchar', { nullable: false, select: true, comment: '상품 이름' })
  public title: string;

  @Column('varchar', { nullable: true, select: true, comment: '상품 설명' })
  public description: string;

  @Column('varchar', { nullable: true, select: true, comment: '안내 문구' })
  public guide: string;

  @Column('int', { nullable: false, select: true, comment: '원가' })
  public originalPrice: number;

  @Column('int', { nullable: false, select: true, comment: '판매가' })
  public salesPrice: number;

  @Column('int', { nullable: false, select: true, comment: '출고 소요 일자' })
  public releaseCount: number;

  @Column('text', { nullable: false, select: false, comment: '정보 제공 고시' })
  public announcement: string;

  @Column('text', { nullable: false, select: false, comment: '정책 안내' })
  public policy: string;

  @ManyToOne((Type) => Seller, (seller) => seller.products)
  seller: Seller;
}
