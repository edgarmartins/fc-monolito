import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ClientModel } from "../../client-adm/repository/client.model";

@Table({ tableName: "order", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  client_id: string;

  @BelongsTo(() => ClientModel)
  client: ClientModel;
}
