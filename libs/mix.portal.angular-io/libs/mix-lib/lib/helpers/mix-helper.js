/**
 * Get Default Configuration
 * @returns { AxiosRequestConfig}
 */
export function getDefaultAxiosConfiguration() {
    return {
        withCredentials: false,
        timeout: 30000,
        baseURL: '',
        headers: {
            common: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                Pragma: 'no-cache',
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
        paramsSerializer: function (params) {
            return Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&');
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21peC5saWIudHMvc3JjL2xpYi9oZWxwZXJzL21peC1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxPQUFPO1FBQ0wsZUFBZSxFQUFFLEtBQUs7UUFDdEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRTtnQkFDTixlQUFlLEVBQUUscUNBQXFDO2dCQUN0RCxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsTUFBTSxFQUFFLGtCQUFrQjthQUMzQjtTQUNGO1FBQ0QsZ0JBQWdCLEVBQUUsVUFBVSxNQUFNO1lBQ2hDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ3ZCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7aUJBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9