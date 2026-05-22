# PCA2 – UNIX Shell Scripting & Commands

---

## Question 1: Shell Script to Compress and Decompress a `.tar.gz` File

```bash
#!/bin/bash

# -------- COMPRESS --------
echo "Enter the file name to compress:"
read filename

if [ -f "$filename" ]; then
    tar -czvf "${filename}.tar.gz" "$filename"
    echo "File compressed successfully: ${filename}.tar.gz"
else
    echo "File not found!"
    exit 1
fi

# -------- DECOMPRESS --------
echo "Decompressing ${filename}.tar.gz ..."
tar -xzvf "${filename}.tar.gz"
echo "File decompressed successfully!"
```

### Explanation of `tar` Flags:

| Flag | Meaning |
|------|---------|
| `-c` | Create a new archive |
| `-x` | Extract from archive |
| `-z` | Filter through gzip (compress/decompress) |
| `-v` | Verbose – show progress |
| `-f` | Specify the archive file name |

### Sample Run:
```
$ bash compress.sh
Enter the file name to compress:
notes.txt
a notes.txt
File compressed successfully: notes.txt.tar.gz
Decompressing notes.txt.tar.gz ...
x notes.txt
File decompressed successfully!
```

---

## Question 2: `zip`, `unzip`, `gzip`, `gunzip` Commands

---

### 1. `zip` – Compress files into a `.zip` archive

**Syntax:** `zip [archive_name.zip] [file(s)]`

```bash
$ zip myarchive.zip file1.txt file2.txt
  adding: file1.txt (deflated 40%)
  adding: file2.txt (deflated 35%)
```

---

### 2. `unzip` – Extract files from a `.zip` archive

**Syntax:** `unzip [archive_name.zip]`

```bash
$ unzip myarchive.zip
Archive:  myarchive.zip
  inflating: file1.txt
  inflating: file2.txt
```

#### `unzip` Options:

| Option | Description | Example |
|--------|-------------|---------|
| `-l` | List contents of zip file without extracting | `unzip -l myarchive.zip` |
| `-o` | Overwrite existing files without prompting | `unzip -o myarchive.zip` |
| `-n` | Never overwrite existing files | `unzip -n myarchive.zip` |

```bash
# List contents
$ unzip -l myarchive.zip
Archive:  myarchive.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
       45  2024-01-10 10:00   file1.txt
       30  2024-01-10 10:01   file2.txt

# Overwrite without asking
$ unzip -o myarchive.zip

# Never overwrite (skip if file exists)
$ unzip -n myarchive.zip
```

---

### 3. `gzip` – Compress a single file (replaces original with `.gz`)

**Syntax:** `gzip [filename]`

```bash
$ gzip notes.txt
# Creates: notes.txt.gz  (original notes.txt is removed)
```

---

### 4. `gunzip` – Decompress a `.gz` file

**Syntax:** `gunzip [filename.gz]`

```bash
$ gunzip notes.txt.gz
# Restores: notes.txt (removes .gz file)
```

---

### Comparison Table:

| Command | Input | Output | Removes Original? |
|---------|-------|--------|-------------------|
| `zip` | Multiple files | `.zip` | No |
| `unzip` | `.zip` | Extracted files | No |
| `gzip` | Single file | `.gz` | Yes |
| `gunzip` | `.gz` | Original file | Yes |

---

## Question 3: Script to Check if a File Exists

```bash
#!/bin/bash

echo "Enter the filename to check:"
read fname

if [ -f "$fname" ]; then
    echo "File exists"
else
    echo "File does not exist"
fi
```

### Sample Run:
```bash
$ bash checkfile.sh
Enter the filename to check:
notes.txt
File exists

$ bash checkfile.sh
Enter the filename to check:
ghost.txt
File does not exist
```

> **Note:** `-f` checks if the path exists **and** is a regular file (not a directory).

---

## Question 4: File Permissions with `chmod`, `ls -l`, and `chown`

---

### a) Create a file named `Mainfile.txt`

```bash
$ touch Mainfile.txt
```

---

### b) Give owner read, write, and execute permissions using `chmod`

```bash
$ chmod 700 Mainfile.txt
# OR using symbolic method:
$ chmod u=rwx Mainfile.txt
```

---

### c) View permissions using `ls -l` and explain output

```bash
$ ls -l Mainfile.txt
-rwx------ 1 john students 0 Jan 10 10:00 Mainfile.txt
```

### Explanation of Each Part:

```
- rwx --- --- 1  john  students  0  Jan 10  10:00  Mainfile.txt
|  |    |   |  |   |      |     |     |       |        |
|  |    |   |  |   |      |     |     |       |        └─ File name
|  |    |   |  |   |      |     |     |       └─ Last modified time
|  |    |   |  |   |      |     |     └─ Last modified date
|  |    |   |  |   |      |     └─ File size (bytes)
|  |    |   |  |   |      └─ Group name
|  |    |   |  |   └─ Owner name
|  |    |   |  └─ Number of hard links
|  |    |   └─ Other permissions (--- = none)
|  |    └─ Group permissions (--- = none)
|  └─ Owner permissions (rwx = read, write, execute)
└─ File type (- = regular file, d = directory)
```

---

### d) Change the owner using `chown`

```bash
# Syntax: chown new_owner filename
$ sudo chown alice Mainfile.txt

# Change both owner and group
$ sudo chown alice:developers Mainfile.txt

# Verify
$ ls -l Mainfile.txt
-rwx------ 1 alice developers 0 Jan 10 10:00 Mainfile.txt
```

---

## Question 5: Script Using `grep` to Search a Word in a File

```bash
#!/bin/bash

echo "Enter the filename to search in:"
read filename

echo "Enter the word to search for:"
read word

if [ ! -f "$filename" ]; then
    echo "File not found!"
    exit 1
fi

echo "Lines containing '$word':"
echo "-------------------------------"
grep "$word" "$filename"

if [ $? -ne 0 ]; then
    echo "No lines found containing '$word'"
fi
```

### Sample Run:

```bash
# Content of data.txt:
# Hello World
# Welcome to Unix
# Unix is powerful
# Goodbye

$ bash searchword.sh
Enter the filename to search in:
data.txt
Enter the word to search for:
Unix
Lines containing 'Unix':
-------------------------------
Welcome to Unix
Unix is powerful
```

### Useful `grep` Variants:

```bash
grep -i "word" file.txt    # Case-insensitive search
grep -n "word" file.txt    # Show line numbers
grep -c "word" file.txt    # Count matching lines
grep -v "word" file.txt    # Lines NOT containing word
```

---

## Question 6: `join` Command to Combine Files on a Common Field

---

### Setup – Create Two Files:

```bash
# employees.txt (ID  Name)
$ cat employees.txt
101 Alice
102 Bob
103 Charlie

# salaries.txt (ID  Salary)
$ cat salaries.txt
101 50000
102 60000
103 55000
```

---

### Basic `join`:

```bash
$ join employees.txt salaries.txt
101 Alice 50000
102 Bob 60000
103 Charlie 55000
```

> `join` matches on the **first field** by default (common field = ID).

---

### Using `-1` and `-2` Options:

| Option | Description |
|--------|-------------|
| `-1 N` | Join on field N of file 1 |
| `-2 N` | Join on field N of file 2 |

```bash
# dept.txt: Name  Department
$ cat dept.txt
Alice HR
Bob IT
Charlie Finance

# info.txt: Department  Name  Location
$ cat info.txt
HR Alice NewYork
IT Bob London
Finance Charlie Paris
```

```bash
# Join on field 1 of dept.txt and field 2 of info.txt
$ join -1 1 -2 2 dept.txt info.txt
Alice HR HR NewYork
Bob IT IT London
Charlie Finance Finance Paris
```

> **`-1 1`** means use field 1 of `dept.txt` (Name)
> **`-2 2`** means use field 2 of `info.txt` (Name)

---

## Question 7: `tar` Command – Create, View, Extract, and Compress

---

### 1. Create an Archive

```bash
$ tar -cvf archive.tar file1.txt file2.txt
file1.txt
file2.txt
```

---

### 2. View (List) Contents of Archive

```bash
$ tar -tvf archive.tar
-rw-r--r-- user/group  45 2024-01-10 file1.txt
-rw-r--r-- user/group  30 2024-01-10 file2.txt
```

---

### 3. Extract an Archive

```bash
$ tar -xvf archive.tar
file1.txt
file2.txt
```

---

### 4. Create a Compressed `.tar.gz` File

```bash
# Method 1: Using tar with -z flag (tar + gzip together)
$ tar -czvf archive.tar.gz file1.txt file2.txt

# Method 2: Using tar and gzip separately
$ tar -cvf archive.tar file1.txt file2.txt
$ gzip archive.tar
# Produces: archive.tar.gz
```

---

### 5. Extract a `.tar.gz` File

```bash
$ tar -xzvf archive.tar.gz
```

---

### `tar` Flag Summary:

| Flag | Meaning |
|------|---------|
| `-c` | Create archive |
| `-x` | Extract archive |
| `-t` | List/view contents |
| `-v` | Verbose output |
| `-f` | Specify filename |
| `-z` | Compress/decompress with gzip |

---

## Question 8: Basic UNIX Commands

---

### a) Display Current Working Directory

```bash
$ pwd
/home/user/LabTest
```

---

### b) List All Files Including Hidden Ones

```bash
$ ls -la
total 8
drwxr-xr-x  2 user group 4096 Jan 10 10:00 .
drwxr-xr-x 10 user group 4096 Jan 10 09:50 ..
-rw-r--r--  1 user group    0 Jan 10 10:01 .hiddenfile
-rw-r--r--  1 user group   45 Jan 10 10:02 Unix
```

> `-a` shows hidden files (files starting with `.`), `-l` shows long format.

---

### c) Create Directory `LabTest` and Navigate Into It

```bash
$ mkdir LabTest
$ cd LabTest
$ pwd
/home/user/LabTest
```

---

### d) Create File `Unix` and Write Text Using `echo`

```bash
$ echo "Welcome to UNIX Programming Lab" > Unix
```

> `>` creates/overwrites the file. Use `>>` to **append** text.

---

### e) Display Content of `Unix`

```bash
$ cat Unix
Welcome to UNIX Programming Lab
```

---

### f) Copy `Unix` to a New File Called `Backup`

```bash
$ cp Unix Backup
$ ls
Backup  Unix
```

---

### g) Rename `Unix` to `Newfile.txt`

```bash
$ mv Unix Newfile.txt
$ ls
Backup  Newfile.txt
```

---

### h) Delete `Backup` File

```bash
$ rm Backup
$ ls
Newfile.txt
```

---

### Full Sequence Summary (Q8):

```bash
pwd                                             # a
ls -la                                          # b
mkdir LabTest && cd LabTest                     # c
echo "Welcome to UNIX Programming Lab" > Unix   # d
cat Unix                                        # e
cp Unix Backup                                  # f
mv Unix Newfile.txt                             # g
rm Backup                                       # h
```

---

> **Tip for Exam:** Always remember that `>` overwrites a file while `>>` appends to it. The `chmod 755` means owner has `rwx`, group has `r-x`, others have `r-x`.