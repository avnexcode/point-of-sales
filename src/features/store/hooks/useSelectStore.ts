import { useSelectParams } from "@/hooks";
import { api } from "@/utils";
import { useEffect, useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

export const useSelectStore = <T extends FieldValues>(name: Path<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);

  const ITEMS_PER_PAGE = 10;

  const {
    page,
    totalPages,
    searchTerm,
    debouncedSearchTerm,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
  } = useSelectParams({
    totalData: totalData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const form = useFormContext<T>();
  const selectedStoreId = form.watch(name);

  const { data: selectedStore, isLoading: isSelectedStoreLoading } =
    api.store.getById.useQuery(
      { id: selectedStoreId },
      {
        enabled: !!selectedStoreId,
        staleTime: Infinity,
      },
    );

  const { data: stores, isLoading: isStoresLoading } =
    api.store.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && stores && !isStoresLoading) {
      setIsReady(true);
      setTotalData(stores.meta.total);
    }
  }, [form.control, stores, isStoresLoading]);

  const allStores = stores?.data ?? [];
  const combinedStores = [...allStores];

  if (
    selectedStore &&
    !allStores.some((store) => store.id === selectedStore.id)
  ) {
    combinedStores.unshift(selectedStore);
  }

  return {
    form,
    selectedStore,
    combinedStores,
    page,
    totalPages,
    searchTerm,
    isReady,
    isStoresLoading,
    isSelectedStoreLoading,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
  };
};
