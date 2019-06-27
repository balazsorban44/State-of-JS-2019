import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { colors } from '../../constants'
import { useI18n } from 'core/i18n/i18nContext'
import HeatmapChartRow from './HeatmapChartRow'

const backgroundColorScale = scaleLinear()
    .domain([-20, -10, 0, 10, 20])
    .range([colors.teal, colors.tealDark, colors.navy, colors.blueDark, colors.blue])

const textColorScale = scaleLinear()
    .domain([-20, -10, 0, 10, 20])
    .range([colors.navy, colors.navyDark, colors.navy, colors.tealLight, colors.tealLight])

const HeatmapChart = ({ keys, items, i18nNamespace }) => {
    const { translate } = useI18n()
    const [currentIndex, setCurrentIndex] = useState(null)

    return (
        <div
            className="Heatmap"
            style={{
                gridTemplateColumns: `auto ${'70px '.repeat(keys.length + 1)}`
            }}
        >
            <div className="Heatmap__Legend">
                {translate(`${i18nNamespace}.axis_legend`)}
            </div>
            <div className="Heatmap__Header">
                {translate(`average`)}
            </div>
            {keys.map(key => {
                return (
                    <div key={key} className="Heatmap__Header">
                        {translate(`${i18nNamespace}.${key}.shorter`)}
                    </div>
                )
            })}
            {items.map((item, i) => (
                <HeatmapChartRow
                    key={item.id}
                    item={item}
                    keys={keys}
                    index={i}
                    backgroundColorScale={backgroundColorScale}
                    textColorScale={textColorScale}
                    setCurrent={setCurrentIndex}
                    isActive={currentIndex === i}
                    isInactive={currentIndex !== null && currentIndex !== i}
                    isEven={i % 2 === 0}
                />
            ))}
        </div>
    )
}

HeatmapChart.propTypes = {
    keys: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            average: PropTypes.number.isRequired,
        })
    ).isRequired,
    i18nNamespace: PropTypes.string.isRequired,
}

export default memo(HeatmapChart)
