// Public enrichment never queries an unversioned name-keyed database table.
// The verified archive is the only public racing-data source.
export function useProfileQuery(_table: string, _column: string, _value: string) {
 return { data: null, isLoading: false, error: null };
}
