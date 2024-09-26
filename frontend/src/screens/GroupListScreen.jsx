import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserGroups, addFavoriteGroup, removeFavoriteGroup, fetchGroupsList, joinGroup } from '../actions/groupActions'; // Import joinGroup
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const GroupListScreen = () => {
    const dispatch = useDispatch();

    const userGroups = useSelector((state) => state.userGroups);
    const { loading, error, favorite_groups, created_groups, joined_groups } = userGroups;

    const allGroups = useSelector((state) => state.groupsList);
    const { groups = [], loading: groupsLoading } = allGroups;

    const [favorites, setFavorites] = useState({});
    const [modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch user groups on component mount
    useEffect(() => {
        dispatch(fetchUserGroups());
    }, [dispatch]);

    // Set favorites based on favorite groups
    useEffect(() => {
        if (favorite_groups) {
            const favoriteMap = favorite_groups.reduce((acc, group) => {
                acc[group.group_tag] = true;
                return acc;
            }, {});
            setFavorites(favoriteMap);
        }
    }, [favorite_groups]);

    // Handle favorite toggle for groups
    const handleFavoriteToggle = (group) => {
        const isFavorite = favorites[group.group_tag];
        const updatedFavorites = { ...favorites }; // Create a new object to avoid mutation

        if (isFavorite) {
            dispatch(removeFavoriteGroup(group.group_tag));
            delete updatedFavorites[group.group_tag]; // Remove from favorites map
        } else {
            dispatch(addFavoriteGroup(group.group_tag));
            updatedFavorites[group.group_tag] = true; // Add to favorites map
        }

        setFavorites(updatedFavorites);
    };

    // Render star icon based on favorites
    const renderStarIcon = (group) => {
        return favorites[group.group_tag] ? solidStar : regularStar;
    };

    // Sort groups with favorites first
    const sortedGroups = (groups) => {
        return [...groups].sort((a, b) => {
            const isAFavorite = favorites[a.group_tag] ? 1 : 0;
            const isBFavorite = favorites[b.group_tag] ? 1 : 0;
            return isBFavorite - isAFavorite; // Sort favorites first
        });
    };

    // Toggle modal for joining groups and fetch groups only when opening
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            dispatch(fetchGroupsList()); // Fetch groups when opening the modal
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter groups based on search term and exclude joined groups
    const filteredGroups = groups.filter(group => 
        !joined_groups.some(joinedGroup => joinedGroup.group_tag === group.group_tag) &&  // Exclude joined groups
        (group.name.toLowerCase().includes(searchTerm.toLowerCase()) || group.group_tag.toLowerCase().includes(searchTerm.toLowerCase())) // Search by name or tag
    );

    return (
        <div className="container mt-4">
            {loading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}

            <Button color="primary" onClick={toggleModal}>Join Group</Button>

            <h2>Created Groups</h2>
            <Row>
                {sortedGroups(created_groups).map((group, index) => (
                    <Col key={`${group.group_tag}-${index}`} sm="6" md="4" lg="3">
                        <Card className="mb-4">
                            <CardImg top width="100%" src={group.group_image} alt={group.name} />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {group.name}
                                    <Button color="link" onClick={() => handleFavoriteToggle(group)}>
                                        <FontAwesomeIcon icon={renderStarIcon(group)} size="lg" />
                                    </Button>
                                </CardTitle>
                                <CardText>{group.group_tag}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h2>Joined Groups</h2>
            <Row>
                {sortedGroups(joined_groups).map((group, index) => (
                    <Col key={`${group.group_tag}-${index}`} sm="6" md="4" lg="3">
                        <Card className="mb-4">
                            <CardImg top width="100%" src={group.group_image} alt={group.name} />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {group.name}
                                    <Button color="link" onClick={() => handleFavoriteToggle(group)}>
                                        <FontAwesomeIcon icon={renderStarIcon(group)} size="lg" />
                                    </Button>
                                </CardTitle>
                                <CardText>{group.group_tag}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Join Group Modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Join a Group</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        placeholder="Search for a group..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Row className="mt-3">
                        {groupsLoading ? (
                            <h4>Loading Groups...</h4>
                        ) : (
                            filteredGroups.map((group, index) => (
                                <Col key={`${group.group_tag}-${index}`} sm="6" md="4" lg="3">
                                    <Card className="mb-4">
                                        <CardImg top width="100%" src={group.group_image} alt={group.name} />
                                        <CardBody>
                                            <CardTitle tag="h5">{group.name}</CardTitle>
                                            <Button color="primary" onClick={() => {
                                                dispatch(joinGroup(group.group_tag)); // Dispatch the joinGroup action
                                                toggleModal(); // Close the modal after joining
                                            }}>Join</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default GroupListScreen;
