import { IApplicationState } from 'store/index';
import { createSelector } from 'reselect';
import { IDeal } from 'store/deals/types';

export const selectDeals = (state: IApplicationState) => state.deals.deals;
export const selectPageSize = (state: IApplicationState) => state.deals.pageSize;
export const selectRequiredDealsNumber = (state: IApplicationState) => state.deals.requiredDealsNumber;

const isDealMoreProfitableThanValue = (deal: IDeal, value: number) => deal.profitValue > value;
const isDealProfitable = (deal: IDeal) => isDealMoreProfitableThanValue(deal, 0);

const getNumberOfNonProfitableDeals = (deals: IDeal[]) => deals.filter((deal) => !isDealProfitable(deal)).length;

const getNumberOfDealsWithProfitHigherThan = (deals: IDeal[], value: number) =>
  deals.filter((deal) => isDealMoreProfitableThanValue(deal, value)).length;

const getNumberOfDealsWithAsset = (deals: IDeal[], asset: string) =>
  deals.filter((deal) => deal.asset === asset).length;

export const selectHistoryDeals = createSelector(
  [selectDeals, selectPageSize, selectRequiredDealsNumber],
  (deals, pageSize, requiredDealsNumber) => {
    const result: IDeal[][] = [];

    // Сортируем по дате закрытия сделки
    const sortedDeals = deals.slice().sort((first, second) => first.finishDateTimestamp - second.finishDateTimestamp);

    // Высчитываем итоговое количество страниц
    const pages = Math.floor(requiredDealsNumber / pageSize);

    // Для каждой страницы создаем пустой массив сделок
    for (let i = 0; i < pages; i++) {
      result[i] = [];
    }

    let currentPage = 0;
    const minProfitValue = 100;

    for (let i = 0; i < sortedDeals.length; i++) {
      // Если текущая страница заполнена, переходим к следующей
      if (result[currentPage].length === pageSize) {
        currentPage++;
      }

      // Выходим из цикла, если заполнили все страницы
      if (currentPage === pages) {
        break;
      }

      const pageDeals = result[currentPage];
      const deal = sortedDeals[i];

      // Не подходит, если сделка убыточна и в текущей странице таких больше чем 2
      const nonProfitable = !isDealProfitable(deal);
      const nonProfitableDealsNumber = getNumberOfNonProfitableDeals(pageDeals);

      if (nonProfitable && nonProfitableDealsNumber >= 2) {
        continue;
      }

      // Не подходит, если прибыль со сделки больше чем 100 и таких сделок уже больше чем 2
      const moreProfitableThanValue = isDealMoreProfitableThanValue(deal, minProfitValue);
      const numberOfDealsWithProfitHigherThan = getNumberOfDealsWithProfitHigherThan(pageDeals, minProfitValue);

      if (moreProfitableThanValue && numberOfDealsWithProfitHigherThan >= 2) {
        continue;
      }

      // Не подходит, если количество сделок с такой валютной парой больше чем 2
      const numberOfDealsWithAsset = getNumberOfDealsWithAsset(pageDeals, deal.asset);

      if (numberOfDealsWithAsset >= 2) {
        continue;
      }

      pageDeals.push(deal);
    }

    return result;
  }
);

export const selectIsFetchingDeals = (state: IApplicationState) => state.deals.isFetchingDeals;
