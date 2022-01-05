type Url = string;
type DateStr = string;

declare namespace API {
  type Resp<T> = Promise<T | null>;
  type BoolResp = Promise<boolean | null>;
  type ArrResp<T> = Promise<T[] | null>;

  type ActionResult = Promise<boolean | null>;
}
type uMap<T> = {
  [key: string]: T;
};
