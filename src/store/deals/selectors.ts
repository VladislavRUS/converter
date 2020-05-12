import { IApplicationState } from 'store/index';
import { createSelector } from 'reselect';
import { IDeal } from 'store/deals/types';

export const selectDeals = (state: IApplicationState) => state.deals.deals;
export const selectPageSize = (state: IApplicationState) => state.deals.pageSize;
export const selectRequiredDealsNumber = (state: IApplicationState) => state.deals.requiredDealsNumber;

const isDealMoreProfitableThanValue = (deal: IDeal, value: number) => deal.profitValue > value;
const isDealProfitable = (deal: IDeal) => isDealMoreProfitableThanValue(deal, 0);

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

    // Количество убыточных сделок на странице
    let nonProfitableDealsNumberInPage = 0;
    // Количество сделок с прибылью больше, чем 100 на странице
    let numberOfDealsWithProfitHigherThanInPage = 0;
    // Количество валютных пар на странице
    let assetsMapInPage: { [key: string]: number } = {};

    for (let i = 0; i < sortedDeals.length; i++) {
      // Если текущая страница заполнена, переходим к следующей
      if (result[currentPage].length === pageSize) {
        currentPage++;

        // Обнуляем значения предыдущей страницы
        nonProfitableDealsNumberInPage = 0;
        numberOfDealsWithProfitHigherThanInPage = 0;
        assetsMapInPage = {};
      }

      // Выходим из цикла, если заполнили все страницы
      if (currentPage === pages) {
        break;
      }

      // Массив сделок текущей страницы
      const pageDeals = result[currentPage];
      const deal = sortedDeals[i];

      const isProfitable = isDealProfitable(deal);

      // Если сделка убыточная
      if (!isProfitable) {
        // И количество таких меньше, чем 2
        if (nonProfitableDealsNumberInPage < 2) {
          nonProfitableDealsNumberInPage++;
          pageDeals.push(deal);
        }

        continue;
      }

      const moreProfitableThanValue = isDealMoreProfitableThanValue(deal, minProfitValue);

      // Если прибыль со сделки больше чем 100
      if (moreProfitableThanValue) {
        // И количество таких сделок меньше, чем 2
        if (numberOfDealsWithProfitHigherThanInPage < 2) {
          numberOfDealsWithProfitHigherThanInPage++;
          pageDeals.push(deal);
        }

        continue;
      }

      // Если валютная пара не была еще обработана, то добавляем для нее нулевое значение
      if (!assetsMapInPage.hasOwnProperty(deal.asset)) {
        assetsMapInPage[deal.asset] = 0;
      }

      // Если количество сделок с такой валютной парой меньше, чем 2
      if (assetsMapInPage[deal.asset] < 2) {
        pageDeals.push(deal);
        assetsMapInPage[deal.asset]++;
      }
    }

    return result;
  }
);

export const selectIsFetchingDeals = (state: IApplicationState) => state.deals.isFetchingDeals;
