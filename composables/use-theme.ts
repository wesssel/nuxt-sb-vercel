const theme = ref({
  isDark: false,
})

export const useTheme = () => {
  return {
    theme,
  }
}
