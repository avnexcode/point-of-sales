import { SelectPagination, SelectSearch } from "@/components/forms";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelectParams } from "@/hooks";
import { cn } from "@/lib/utils";
import { api } from "@/utils";
import { renderElements } from "@/utils/render-elements";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type WarehouseSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
};

export const WarehouseSelect = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
}: WarehouseSelectProps<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);

  const ITEMS_PER_PAGE = 3;

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
  const selectedWarehouseId = form.watch(name);

  const { data: selectedWarehouse, isLoading: isSelectedWarehouseLoading } =
    api.warehouse.getById.useQuery(
      { id: selectedWarehouseId },
      {
        enabled: !!selectedWarehouseId,
        staleTime: Infinity,
      },
    );

  const { data: warehouses, isLoading: isWarehousesLoading } =
    api.warehouse.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && warehouses && !isWarehousesLoading) {
      setIsReady(true);
      setTotalData(warehouses.meta.total);
    }
  }, [form.control, warehouses, isWarehousesLoading]);

  const allWarehouses = warehouses?.data ?? [];
  const combinedWarehouses = [...allWarehouses];

  if (
    selectedWarehouse &&
    !allWarehouses.some((warehouse) => warehouse.id === selectedWarehouse.id)
  ) {
    combinedWarehouses.unshift(selectedWarehouse);
  }

  if (!isReady) {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={cn("w-full", className)}
        >
          <FieldLabel htmlFor={field.name} className="capitalize">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value ?? ""}
            defaultValue={field.value}
            onOpenChange={setIsOpen}
            open={isOpen}
          >
            <SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
              <SelectValue
                placeholder={`Pilih ${label.toLowerCase()}`}
                className="capitalize"
              >
                {selectedWarehouse?.name ?? `Pilih ${label.toLowerCase()}`}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)]">
              <SelectSearch
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClick={handleSearchInputClick}
              />

              {isWarehousesLoading || isSelectedWarehouseLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedWarehouses,
                    keyExtractor: (warehouse) => warehouse.id,
                    render: (warehouse) => (
                      <SelectItem
                        key={warehouse.id}
                        value={warehouse.id}
                        className="capitalize"
                      >
                        {warehouse.name}
                      </SelectItem>
                    ),
                    fallback: (
                      <SelectItem value="none" disabled>
                        Tidak ada data kategori tersedia
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isWarehousesLoading}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
