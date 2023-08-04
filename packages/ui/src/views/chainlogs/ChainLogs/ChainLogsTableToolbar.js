import { useEffect, useState } from 'react'
import { Toolbar, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PropTypes from 'prop-types'
import { SearchingField } from 'ui-component/input/SearchField'
import Grid from '@mui/material/Unstable_Grid2'
import { useDebounce } from 'hooks/useDebounce'

export function ChainLogsTableToolbar(props) {
    const { numSelected, onChangeTerm, handleDelete } = props

    const [value, setValue] = useState('')
    const debouncedValue = useDebounce(value, 500)

    const handleChange = (event) => {
        event.stopPropagation()
        setValue(event.target.value)
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.stopPropagation()
        }
    }

    useEffect(() => {
        onChangeTerm(value)
    }, [debouncedValue])

    return (
        <>
            <Toolbar>
                <Grid container xs={12}>
                    <Grid container xs={12} sm={12}>
                        <SearchingField onChange={handleChange} onKeyDown={onKeyDown} />
                    </Grid>

                    <Grid
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        {numSelected > 0 ? (
                            <>
                                <Typography sx={{ flex: '1 0 auto' }} color='inherit' variant='subtitle1' component='span'>
                                    {numSelected} selected
                                </Typography>
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        ) : (
                            <Typography sx={{ flex: '1 0 auto' }} variant='h6' id='tableTitle' component='div'></Typography>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </>
    )
}

ChainLogsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onChangeTerm: PropTypes.func,
    handleDelete: PropTypes.func
}
