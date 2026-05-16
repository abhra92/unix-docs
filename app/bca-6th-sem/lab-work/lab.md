
## 1. Basic Unix Commands

### Q1.1: List all files with permissions and ownership

**Command:**
```bash
ls -l
```

**Step-by-step:**
1. Open terminal
2. Navigate to desired directory: `cd /path/to/directory`
3. Execute: `ls -l`
4. For all files including hidden: `ls -la`

**Output explanation:**
```bash
-rw-r--r-- 1 user group 1234 Jan 01 12:00 file.txt
│          │ │    │     │    │            │
│          │ │    │     │    │            └─ filename
│          │ │    │     │    └─ modification time
│          │ │    │     └─ size in bytes
│          │ │    └─ group
│          │ └─ owner
│          └─ number of links
└─ permissions
```

---

### Q1.2: Display top 10 largest files

**Command:**
```bash
du -ah | sort -rh | head -10
```

**Step-by-step:**
1. `du -ah` - Display disk usage for all files in human-readable format
2. `sort -rh` - Sort in reverse order with human-readable numbers
3. `head -10` - Display first 10 lines

**Alternative (more accurate):**
```bash
find . -type f -exec du -h {} + | sort -rh | head -10
```

---

### Q1.3: Find and replace using sed

**Command:**
```bash
sed 's/oldword/newword/g' filename
```

**Step-by-step guide:**

**Method 1: Display changes (doesn't modify file)**
```bash
sed 's/old/new/g' file.txt
```

**Method 2: Save to new file**
```bash
sed 's/old/new/g' file.txt > newfile.txt
```

**Method 3: Edit file in-place**
```bash
sed -i 's/old/new/g' file.txt
```

**Example:**
```bash
# Create test file
echo "Hello World, Hello Unix" > test.txt

# Replace "Hello" with "Hi"
sed 's/Hello/Hi/g' test.txt

# Replace only first occurrence per line
sed 's/Hello/Hi/' test.txt

# Case-insensitive replacement
sed 's/hello/Hi/gi' test.txt
```

---

## 2. File and Directory Management

### Q2.1: Create directory structure

**Script: `create_project.sh`**
```bash
#!/bin/bash

# Create project directory structure
mkdir -p Project/Docs
mkdir -p Project/Src
mkdir -p Project/Bin

# Verify the structure
echo "Project structure created:"
tree Project

# Alternative verification if tree is not installed
echo -e "\nDirectory structure:"
ls -R Project
```

**Step-by-step execution:**
```bash
# Create the script
nano create_project.sh

# Paste the above code

# Save and exit (Ctrl+X, Y, Enter)

# Make executable
chmod +x create_project.sh

# Run the script
./create_project.sh
```

**Manual verification:**
```bash
find Project -type d
```

---

### Q2.2: Backup .txt files

**Script: `backup_txt.sh`**
```bash
#!/bin/bash

# Get current date
DATE=$(date +%Y-%m-%d)

# Create backup directory
BACKUP_DIR="Backup_$DATE"
mkdir -p "$BACKUP_DIR"

# Count .txt files
TXT_COUNT=$(ls *.txt 2>/dev/null | wc -l)

if [ $TXT_COUNT -eq 0 ]; then
    echo "No .txt files found in current directory"
    exit 1
fi

# Copy all .txt files to backup directory
cp *.txt "$BACKUP_DIR/"

# Display result
echo "Backup completed successfully!"
echo "Copied $TXT_COUNT .txt file(s) to $BACKUP_DIR"
ls -lh "$BACKUP_DIR"
```

**Step-by-step:**
```bash
# Create test files
touch file1.txt file2.txt file3.txt

# Create and run script
nano backup_txt.sh
# (paste code above)

chmod +x backup_txt.sh
./backup_txt.sh
```

---

## 3. Process Management

### Q3.1: List processes owned by current user

**Script: `my_processes.sh`**
```bash
#!/bin/bash

# Method 1: Using ps
echo "=== Processes owned by $USER ==="
ps -u $USER

# Method 2: More detailed output
echo -e "\n=== Detailed Process List ==="
ps -u $USER -f

# Method 3: With custom format
echo -e "\n=== Custom Format ==="
ps -u $USER -o pid,ppid,%cpu,%mem,cmd
```

**Direct commands:**
```bash
# Simple list
ps -u $USER

# With full details
ps aux | grep $USER

# Using top
top -u $USER
```

---

### Q3.2: Monitor CPU usage with alert

**Script: `cpu_monitor.sh`**
```bash
#!/bin/bash

# Set CPU threshold (percentage)
THRESHOLD=80

# Function to get CPU usage
get_cpu_usage() {
    top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}'
}

echo "Monitoring CPU usage (Threshold: $THRESHOLD%)"
echo "Press Ctrl+C to stop"

while true; do
    # Get current CPU usage
    CPU_USAGE=$(get_cpu_usage)
    CPU_INT=${CPU_USAGE%.*}
    
    # Display current usage
    echo "$(date '+%Y-%m-%d %H:%M:%S') - CPU Usage: ${CPU_USAGE}%"
    
    # Check if threshold exceeded
    if [ $CPU_INT -gt $THRESHOLD ]; then
        echo "⚠️  ALERT: CPU usage exceeded threshold! Current: ${CPU_USAGE}%"
        # Optional: Send notification or email
    fi
    
    # Wait 5 seconds before next check
    sleep 5
done
```

**Alternative simple version:**
```bash
#!/bin/bash

THRESHOLD=80

while true; do
    CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    echo "CPU: $CPU%"
    
    if (( $(echo "$CPU > $THRESHOLD" | bc -l) )); then
        echo "ALERT: High CPU usage!"
    fi
    
    sleep 5
done
```

---

## 4. Text Processing

### Q4.1: Extract columns using awk

**Sample CSV file: `data.csv`**
```csv
Name,Age,City,Salary
John,25,NYC,50000
Alice,30,LA,60000
Bob,35,Chicago,55000
```

**Script: `extract_columns.sh`**
```bash
#!/bin/bash

# Create sample CSV file
cat > data.csv << EOF
Name,Age,City,Salary
John,25,NYC,50000
Alice,30,LA,60000
Bob,35,Chicago,55000
EOF

echo "=== Original File ==="
cat data.csv

echo -e "\n=== Extracting 2nd and 4th columns ==="
awk -F',' '{print $2, $4}' data.csv

echo -e "\n=== With formatted output ==="
awk -F',' '{printf "Age: %-5s Salary: %s\n", $2, $4}' data.csv

echo -e "\n=== Skip header ==="
awk -F',' 'NR>1 {print $2, $4}' data.csv
```

**Direct commands:**
```bash
# Basic extraction
awk -F',' '{print $2, $4}' data.csv

# With column names
awk -F',' '{print "Age:", $2, "Salary:", $4}' data.csv

# Skip header line
awk -F',' 'NR>1 {print $2, $4}' data.csv
```

---

### Q4.2: Find pattern with grep and count

**Script: `pattern_search.sh`**
```bash
#!/bin/bash

# Create test file
cat > sample.txt << EOF
Unix is great
Linux is based on Unix
I love Unix programming
Unix shell scripting is powerful
This line has unix in lowercase
EOF

echo "=== Original File ==="
cat sample.txt

echo -e "\n=== Lines containing 'Unix' ==="
grep 'Unix' sample.txt

echo -e "\n=== Count of occurrences (case-sensitive) ==="
grep -o 'Unix' sample.txt | wc -l

echo -e "\n=== Count of lines containing pattern ==="
grep -c 'Unix' sample.txt

echo -e "\n=== Case-insensitive search ==="
grep -i 'unix' sample.txt

echo -e "\n=== Count (case-insensitive) ==="
grep -io 'unix' sample.txt | wc -l

echo -e "\n=== With line numbers ==="
grep -n 'Unix' sample.txt
```

**Direct commands:**
```bash
# Find pattern
grep 'pattern' filename

# Count lines with pattern
grep -c 'pattern' filename

# Count total occurrences
grep -o 'pattern' filename | wc -l

# Case-insensitive
grep -i 'pattern' filename

# With line numbers
grep -n 'pattern' filename
```

---

## 5. Shell Scripting Basics

### Q5.1: Calculate factorial

**Script: `factorial.sh`**
```bash
#!/bin/bash

# Function to calculate factorial
factorial() {
    local num=$1
    local fact=1
    
    if [ $num -lt 0 ]; then
        echo "Error: Negative numbers don't have factorial"
        return 1
    fi
    
    if [ $num -eq 0 ] || [ $num -eq 1 ]; then
        echo 1
        return 0
    fi
    
    for ((i=2; i<=num; i++)); do
        fact=$((fact * i))
    done
    
    echo $fact
}

# Main program
echo "Factorial Calculator"
echo "===================="
read -p "Enter a number: " number

# Validate input
if ! [[ "$number" =~ ^[0-9]+$ ]]; then
    echo "Error: Please enter a valid positive integer"
    exit 1
fi

result=$(factorial $number)
echo "Factorial of $number is: $result"
```

**Recursive version:**
```bash
#!/bin/bash

factorial() {
    if [ $1 -le 1 ]; then
        echo 1
    else
        last=$(factorial $(($1 - 1)))
        echo $(($1 * last))
    fi
}

read -p "Enter number: " num
echo "Factorial: $(factorial $num)"
```

**Step-by-step execution:**
```bash
chmod +x factorial.sh
./factorial.sh
# Enter: 5
# Output: Factorial of 5 is: 120
```

---

### Q5.2: Check file properties

**Script: `check_file.sh`**
```bash
#!/bin/bash

echo "File Property Checker"
echo "====================="
read -p "Enter filename: " filename

# Check if file exists
if [ ! -e "$filename" ]; then
    echo "❌ File does not exist: $filename"
    exit 1
fi

echo "✅ File exists: $filename"
echo ""
echo "File Properties:"
echo "================"

# Check file type
if [ -f "$filename" ]; then
    echo "📄 Type: Regular file"
elif [ -d "$filename" ]; then
    echo "📁 Type: Directory"
elif [ -L "$filename" ]; then
    echo "🔗 Type: Symbolic link"
else
    echo "❓ Type: Special file"
fi

# Check read permission
if [ -r "$filename" ]; then
    echo "✅ Readable: Yes"
else
    echo "❌ Readable: No"
fi

# Check write permission
if [ -w "$filename" ]; then
    echo "✅ Writable: Yes"
else
    echo "❌ Writable: No"
fi

# Check execute permission
if [ -x "$filename" ]; then
    echo "✅ Executable: Yes"
else
    echo "❌ Executable: No"
fi

# Additional information
echo ""
echo "Additional Information:"
echo "======================="
echo "Size: $(stat -f%z "$filename" 2>/dev/null || stat -c%s "$filename" 2>/dev/null) bytes"
echo "Owner: $(stat -f%Su "$filename" 2>/dev/null || stat -c%U "$filename" 2>/dev/null)"
echo "Permissions: $(stat -f%Sp "$filename" 2>/dev/null || stat -c%A "$filename" 2>/dev/null)"
echo "Last modified: $(stat -f%Sm "$filename" 2>/dev/null || stat -c%y "$filename" 2>/dev/null)"
```

**Simplified version:**
```bash
#!/bin/bash

read -p "Enter filename: " file

if [ -e "$file" ]; then
    echo "File exists"
    [ -r "$file" ] && echo "✓ Readable" || echo "✗ Not Readable"
    [ -w "$file" ] && echo "✓ Writable" || echo "✗ Not Writable"
    [ -x "$file" ] && echo "✓ Executable" || echo "✗ Not Executable"
else
    echo "File does not exist"
fi
```

**Testing:**
```bash
# Create test file
touch testfile.txt
chmod 644 testfile.txt

# Run script
./check_file.sh
# Enter: testfile.txt
```

---

## Quick Reference Card

### File Test Operators
```bash
-e file    # exists
-f file    # is regular file
-d file    # is directory
-r file    # is readable
-w file    # is writable
-x file    # is executable
-s file    # size > 0
-L file    # is symbolic link
```

### Comparison Operators
```bash
# Numeric
-eq  # equal
-ne  # not equal
-lt  # less than
-le  # less or equal
-gt  # greater than
-ge  # greater or equal

# String
=    # equal
!=   # not equal
-z   # zero length
-n   # non-zero length
```

### Common Commands Summary
```bash
ls -la          # list all files with details
du -h           # disk usage human-readable
find . -name    # find files by name
grep -i         # case-insensitive search
awk -F          # field separator
sed -i          # in-place edit
chmod +x        # make executable
ps aux          # all processes
top             # process monitor
```