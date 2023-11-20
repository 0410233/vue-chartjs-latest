
export function setLabels(currentData, nextLabels) {
  currentData.labels = nextLabels
}

export function setDatasets(currentData, nextDatasets, datasetIdKey) {
  const addedDatasets = []

  currentData.datasets = nextDatasets.map(
    nextDataset => {
      // given the new set, find it's current match
      const currentDataset = currentData.datasets.find(
        dataset =>
          dataset[datasetIdKey] === nextDataset[datasetIdKey]
      )

      // There is no original to update, so simply add new one
      if (
        !currentDataset ||
        !nextDataset.data ||
        addedDatasets.includes(currentDataset)
      ) {
        return { ...nextDataset }
      }

      addedDatasets.push(currentDataset)

      Object.assign(currentDataset, nextDataset)

      return currentDataset
    }
  )
}

export function handleDataChange(chart, nextData, prevData) {
  if (chart && nextData) {
    let shouldUpdate = false

    const nextLabels = nextData.labels
    const prevLabels = prevData.labels
    const nextDatasets = nextData.datasets
    const prevDatasets = prevData.datasets

    if (nextLabels !== prevLabels) {
      setLabels(chart.config.data, nextLabels)
      shouldUpdate = true
    }

    if (nextDatasets && nextDatasets !== prevDatasets) {
      setDatasets(chart.config.data, nextDatasets, 'label')
      shouldUpdate = true
    }

    return shouldUpdate
  }
  return false
}

export function handleOptionsChange(chart, nextOptions, prevOptions) {
  if (chart && nextOptions) {
    const options = chart.options
    if (options && nextOptions !== prevOptions) {
      Object.assign(options, nextOptions)
      return true
    }
  }
  return false
}
