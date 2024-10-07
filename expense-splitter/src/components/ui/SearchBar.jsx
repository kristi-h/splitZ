import TextField from "@mui/material/TextField";

function SearchBar({inputHandler}) {

    return (
        <div>
            <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
            />
        </div>
    )
}

export default SearchBar;